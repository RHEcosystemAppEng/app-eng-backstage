################################################
# Makefile for deploying Backstage #
################################################

IMAGE ?= quay.io/ecosystem-appeng/appeng-backstage
IMAGE_TAG ?= 2.0
DEV_NAMESPACE ?= ${USER}-backstage
NAME=backstage
HOSTNAME ?=  $(strip $(call get_cluster_addr))
CONFIG_FILE_NAME ?= app-config.yaml

##########################
# Plugins settings for backstage
##########################

# Github Authentication and integration
GITHUB_CLIENT_ID ?= dummy-val
GITHUB_CLIENT_SECRET ?=dummy-val
GITHUB_ACCESS_TOKEN ?=dummy-val



##########################
# Customizable Variables #
##########################
BIN_AWK ?= awk ##@ Set a custom 'awk' binary path if not in PATH
BIN_OC ?= oc ##@ Set a custom 'oc' binary path if not in PATH
BIN_YQ ?= yq ##@ Set a custom 'yq' binary path if not in PATH


#####################
# various functions #
#####################
define get_cluster_addr
	$(shell $(BIN_OC) get routes -n openshift-console console --output=yaml | $(BIN_YQ) '.spec.host' | $(BIN_AWK) '{gsub(/console-openshift-console./, ""); print}')
endef

CONTAINER_ENGINE ?= docker
ifneq (,$(wildcard $(CURDIR)/.docker))
	DOCKER_CONF := $(CURDIR)/.docker
else
	DOCKER_CONF := $(HOME)/.docker
endif

CONFIG_CONTENT=$$(yq e '.app.baseUrl = "https://$(NAME)-$(DEV_NAMESPACE).$(HOSTNAME)"' $(CONFIG_FILE_NAME) | \
	yq e '.backend.baseUrl = "https://$(NAME)-$(DEV_NAMESPACE).$(HOSTNAME)"' - | \
	yq e '.backend.cors.origin = "https://$(NAME)-$(DEV_NAMESPACE).$(HOSTNAME)"' -); \


########################################################
# Makefile section for building and pushing backstage image #
########################################################

.PHONY: image/push
## Build and push the image
image/push:
	${CONTAINER_ENGINE} --config=${DOCKER_CONF} push ${IMAGE}:latest
	${CONTAINER_ENGINE} --config=${DOCKER_CONF} push ${IMAGE}:${IMAGE_TAG}


.PHONY: image/build
## Build the image
image/build:
	${CONTAINER_ENGINE} build --ulimit nofile=16384:65536 --tag ${IMAGE}:${IMAGE_TAG} --tag ${IMAGE}:latest .

########################################################
# Makefile section for deploying backstage using openshift template #
########################################################


.PHONY: template/apply
template/apply:
	@if ! oc get project $(DEV_NAMESPACE) >/dev/null 2>&1; then \
		oc new-project $(DEV_NAMESPACE); \
		oc process -f deploy/template/dev-template.yaml -p CONFIG_CONTENT="$(CONFIG_CONTENT)" -p  IMAGE=$(IMAGE) -p IMAGE_TAG=$(IMAGE_TAG) -p DEV_NAMESPACE=$(DEV_NAMESPACE) -p HOSTNAME=$(HOSTNAME)   -p GITHUB_CLIENT_ID=$(GITHUB_CLIENT_ID) -p  GITHUB_CLIENT_SECRET=$(GITHUB_CLIENT_SECRET) -p GITHUB_ACCESS_TOKEN=$(GITHUB_ACCESS_TOKEN) | oc create --save-config -n $(DEV_NAMESPACE) -f -; \
	else \
		oc process -f deploy/template/dev-template.yaml -p CONFIG_CONTENT="$(CONFIG_CONTENT)" -p IMAGE=$(IMAGE) -p IMAGE_TAG=$(IMAGE_TAG) -p DEV_NAMESPACE=$(DEV_NAMESPACE) -p HOSTNAME=$(HOSTNAME)  -p GITHUB_CLIENT_ID=$(GITHUB_CLIENT_ID)  -p GITHUB_CLIENT_SECRET=$(GITHUB_CLIENT_SECRET) -p GITHUB_ACCESS_TOKEN=$(GITHUB_ACCESS_TOKEN) | oc apply -n $(DEV_NAMESPACE) -f -; \
	fi

.PHONY: template/clean
template/clean:
	oc process -f deploy/template/dev-template.yaml -p DEV_NAMESPACE=$(DEV_NAMESPACE)  | oc -n $(DEV_NAMESPACE) delete -f -
