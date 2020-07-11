const path = require('path');

module.exports = function(plop) {
  plop.addHelper('absPath', function(p) {
    return path.resolve(plop.getPlopfilePath(), p);
  });

  plop.setGenerator('component', {
    description: 'creates new component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter component name',
        validate: function(value) {
          if (/.+/.test(value)) {
            return true;
          }
          return 'name is required';
        },
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{kebabCase name}}/{{kebabCase name}}.tsx',
        templateFile: 'templates/component.txt',
      },
      {
        type: 'add',
        path: 'src/components/{{kebabCase name}}/{{kebabCase name}}.scss',
        template: '',
      },
      {
        type: 'add',
        path: 'src/components/{{kebabCase name}}/index.ts',
        templateFile: 'templates/component-index.txt',
      },
      {
        type: 'append',
        path: 'src/components/index.ts',
        templateFile: 'templates/index.txt',
      },
      {
        type: 'add',
        path: 'src/stories/{{kebabCase name}}.stories.tsx',
        templateFile: 'templates/component-stories.txt',
      },
    ],
  });
  plop.setGenerator('route', {
    description: 'creates new route',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter route name',
        validate: function(value) {
          if (/.+/.test(value)) {
            return true;
          }
          return 'name is required';
        },
      },
    ],
    actions: [],
  });
};
