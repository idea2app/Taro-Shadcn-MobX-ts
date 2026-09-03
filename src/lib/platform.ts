export function isH5(): boolean {
    return import.meta.env.VITE_VPT_TARGET === 'h5'
}
