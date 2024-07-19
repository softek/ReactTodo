# ReactTodo
A simple todo list application to show an example of a React Application with an ASP.Net core backend.

## Technologies
* [Vite](https://vitejs.dev/) development environment/build system
* [Storybook](https://storybook.js.org/) front end component testing and development
* [React Router](https://reactrouter.com/en/main) for managing pages
* [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)


## Running Application
1. From the directory `.\ReactTodo.Core.Infrastructure` run the command `dotnet ef database update -s ..\ReactTodo.Server\` to deploy the Sqlite database.
1. From the directory `.\ReactTodo.Server\` run the command `dotnet run`

## Storybook
Storybook is a tool for developing and testing front end controls.

### Running Storybook
From the `\reacttodo.client` directory run the command `npm run storybook`. This will launch storybook on http://localhost:6006/.

### Running Storybook Tests
Storybook must be running before starting tests. Once storybook has started the command `npm run test-storybook` can be executed from the `\reacttodo.client` directory. 

Test can be automatically re-executed on file changes by running the `npm run test-storybook -- --watch` command.

### Updating Storybook Snapshots
Storybook task a snapshot of the DOM for each story saved to a `.snap` file and a screenshot. If the component changes these test will fail until the snapshots are updated. from the `\reacttodo.client` run the command `npm run update-snapshots`.
