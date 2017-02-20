import resolve from "rollup-plugin-node-resolve";

export default {
    format: 'umd',
    moduleName: 'bamaa.lib-3',
    plugins: [
        resolve({
            jsnext: true,
            main: true,
            browser: true
        })
    ],
    external: [
        "@angular/core",
        "rxjs",
        "@bamaa/lib-1"
    ],
    onwarn: (warning) => {
        const skip_codes = [
            'THIS_IS_UNDEFINED',
            'MISSING_GLOBAL_NAME'
        ];
        if (skip_codes.indexOf(warning.code) != -1) return;
        console.error(warning);
    }
}