export interface ScanResponse {
    dependencies: Dependencies
    vulnerabilities: Vulnerabilities
    providerStatuses: ProviderStatuses[]
}

export interface Dependencies {
    scanned: number
    transitive: number
}

export interface Vulnerabilities {
    direct: number
    total: number
    critical: number
    high: number
    medium: number
    low: number
}

export interface ProviderStatuses {
    ok: boolean
    provider: string
    status: number
    message: string
}
