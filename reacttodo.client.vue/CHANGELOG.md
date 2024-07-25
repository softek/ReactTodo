This file explains how Visual Studio created the project.

The following tools were used to generate this project:
- create-vite

The following steps were used to generate this project:
- Create vue project with create-vite: `npm init --yes vue@latest reacttodo.client.vue -- --eslint  --typescript `.
- Add `shims-vue.d.ts` for basic types.
- Create project file (`reacttodo.client.vue.esproj`).
- Create `launch.json` to enable debugging.
- Create `nuget.config` to specify location of the JavaScript Project System SDK (which is used in the first line in `reacttodo.client.vue.esproj`).
- Add project to solution.
- Write this file.
