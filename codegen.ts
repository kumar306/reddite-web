import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
  // this assumes that all your source files are in a top-level `app/` directory - you might need to adjust this to your file structure
  documents: ['app/**/*.graphql'],
  emitLegacyCommonJSImports: false,
  generates: {
    './app/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
        fragmentMasking: false
      }
    }
  },
};

export default config;