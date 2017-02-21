import resolve from "rollup-plugin-node-resolve";

export default {
    entry: '../../dist/lib-1/index.js',
    dest: '../../dist/lib-1/index.umd.js',
    format: 'umd',
    moduleName: 'bamaa.lib-1',
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
        "rxjs/Observable"

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