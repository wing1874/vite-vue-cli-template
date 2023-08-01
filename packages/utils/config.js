// 格式化需要按照的公共包
export const commonPackage = [
  'eslint',
  'prettier',
  // 用于 Prettier 格式化的 ESLint 插件
  'eslint-plugin-prettier',
  // 关闭eslint中不必要的或者可能和prettier冲突的规则
  'eslint-config-prettier',
  // vue 相关的 eslint 插件
  'vue-eslint-parser', 
  'eslint-plugin-vue'
]
// 公共的 eslint 配置
export const commonEslintConfig = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  overrides: [],
};
export const eslintIgnore = ['node_modules', 'dist'];

// 公共的 prettierrc 配置
export const commonPrettierrcConfig = {
  // 单行字符长度
  printWidth: 100,
  // 是否使用单引号
  singleQuote: true,
  // 多行数组是否需要尾部追加逗号 es5 语法需要
  trailingComma: 'es5',
};

// vscode 的统一配置，前提是安装了 eslint prettier等相关插件
export const commonVsCodeConfig = {
// -----------统一配置--------------
  // 原则：不允许有和 prettier 格式化冲突的配置；一般为会对文件进行重写的插件和配置
  // 是否在保存时格式化文件, 是，保证 prettier 起作用
  "editor.formatOnSave": true,
  // 保证 prettier 已启用且统一 prettier 插件
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  // 指定文件相应后缀的语言模式
  "files.associations": {
    "*.tsx": "typescriptreact",
    "*.jsx": "javascriptreact"
  },
  // 默认文件编码 utf-8
  "files.encoding": "utf8",
  // 关闭 editor 内置样式校验，stylelint 插件建议
  "css.validate": false,
  "less.validate": false,
  "scss.validate": false,
  // 关闭 JavaScript 验证
  "javascript.validate.enable": false,
  // eslint 校验的语言列表
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescriptreact",
    {
      "language": "vue",
      // 额外配置自动修复
      "autoFix": true
    },
    {
      "language": "typescript",
      // 额外配置自动修复
      "autoFix": true
    },
    {
      "language": "typescriptreact",
      // 额外配置自动修复
      "autoFix": true
    }
  ],
  // 开启自动修复
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  },
  // ---------统一配置结束----------------
}

// 路由，element-ui+
export const commonDependencies = [
  'vue-router','element-plus'
]