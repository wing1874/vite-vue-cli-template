import prompts from 'prompts';
import { createSpinner } from 'nanospinner';
import { fileURLToPath } from 'node:url';
import fs from 'fs';

import path from 'path';
import util from 'util';
import { exec } from 'child_process';

const execPromise = util.promisify(exec);

import { red, green, reset } from 'kolorist';

import { formatTargetDir, copy } from '../packages/utils/index.js';
const defaultTargetDir = 'vite-vue-project';

// eslint-disable-next-line no-undef
const cwd = process.cwd();

async function init() {
  // project目录
  let targetDir = defaultTargetDir;

  let result;

  try {
    result = await prompts([
      {
        type: 'text',
        name: 'projectName',
        message: reset('Project name:'),
        initial: defaultTargetDir,
        onState: (state) => {
          targetDir = formatTargetDir(state.value) || defaultTargetDir;
        },
      },
      {
        type: (_, { overwrite }) => {
          if (overwrite === false) {
            throw new Error(red('✖') + ' Operation cancelled');
          }
          return null;
        },
        name: 'overwriteChecker',
      },
      {
        type: 'select',
        name: 'projectType',
        message: '选择项目类型',
        choices: [
          {
            title: 'base',
            value: 'base',
          },
          {
            title: 'ts',
            value: 'ts',
          },
        ],
      },
      {
        type: 'select',
        name: 'pkgManage',
        message: '选择包管理器',
        choices: [
          { title: 'npm', value: 'npm' },
          { title: 'yarn', value: 'yarn' },
          { title: 'pnpm', value: 'pnpm' },
        ],
      },
    ]);

    const root = path.join(cwd, targetDir);

    const { projectName, projectType, pkgManage } = result;
    if (!projectName) return;
    if (fs.existsSync(targetDir)) {
      spinner.error({ text: 'Project name 已存在', mark: ':(' });
      return;
    }

    // copy
    const TEMPLATE = {
      base: '../packages/template/base-ui-element/',
      ts: '../packages/template/ts-ui-element/',
    };
    const templateDir = path.resolve(
      fileURLToPath(import.meta.url),
      '..',
      `${TEMPLATE[projectType]}`
    );

    // 创建项目文件夹
    fs.mkdirSync(root, { recursive: true });

    const write = (file) => {
      const targetPath = path.join(root, file);

      if (file === 'package.json') {
        const content = fs.readFileSync(path.resolve(templateDir, file), 'utf-8');
        fs.writeFileSync(
          targetPath,
          content.replace(`"name": "vue-element-ui",`, `"name": "${projectName}",`)
        );
      } else {
        copy(path.resolve(templateDir, file), targetPath);
      }
    };

    const files = fs.readdirSync(templateDir);
    for (const file of files) {
      write(file);
    }

    const installMap = {
      npm: `npm i`,
      yarn: `yarn`,
      pnpm: `pnpm install`,
    };

    const spinner = createSpinner('install packages...').start();

    await execPromise(`${installMap[pkgManage]}`, { cwd: root });

    spinner.success({ text: green('All done! 🎉'), mark: '✔' });
  } catch (error) {
    console.log(error);
  }
}

init().catch((e) => {
  console.error(e);
});
