import resolve from "rollup-plugin-node-resolve";

export default {
    entry: '../../dist/lib-2/index.js',
    dest: '../../dist/lib-2/index.umd.js',
    format: 'umd',
    moduleName: 'bamaa.lib-2',
    plugins: [
        resolve({
            jsnext: true,
            main: true,
            browser: true
        })
    ],
    external: [
        "@angular/core",
        "@angular/http",
        "rxjs",
        "rxjs/Observable",
        "ng2-translate"
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