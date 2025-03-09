![image](https://github.com/user-attachments/assets/a0316df2-8134-4f6d-ac6c-5e465cd47ebf)

![image](https://github.com/user-attachments/assets/78f69244-fd03-40c1-b318-f89161ef2ef3)

![image](https://github.com/user-attachments/assets/10a69776-b496-43c0-9dd2-c1cd518f3372)

![image](https://github.com/user-attachments/assets/f4c3ed10-80ff-4b41-a041-e40829a639b6)


# Rick and Morty Code Test

## Project Description

This project is a web application that uses React and Redux to display information about the characters, episodes, and locations from the Rick and Morty series. The application consumes data from the [Rick & Morty API](https://rickandmortyapi.com/documentation/#graphql) using the [urql](https://formidable.com/open-source/urql/) client.

## Requirements

- Node.js
- npm

## Installation

npm install

## Available Scripts

- npm run dev: Starts the development server.
- npm run build: Builds the application for production.
- npm run test: Runs the tests.
- npm run preview: Previews the built application.
- npm run ts:check: Checks TypeScript types.
- npm run codegen: Generates GraphQL types.
- npm run download-schema: Downloads the GraphQL schema.

## Folder Structure

- src/: Contains the application source code.
  - components/: Reusable components.
  - features/: Redux slices to manage state.
  - pages/: Application pages.
  - styles/: SCSS files for application styling.
  - types/: TypeScript type definitions.
  - tests/: Unit and integration tests.

## Tests

Tests have been implemented using Jest and React Testing Library. To run the tests, use the following command:

```bash
npm run test
```

## Implemented Tests

- **HomePage.test.tsx**: Rendering test for the home page.
- **CharacterCard.test.tsx**: Rendering and navigation test for the character card component.
- **Filter.test.tsx**: Rendering and functionality test for the filter component.
- **NavBar.test.tsx**: Rendering test for the navigation bar.
- **CharactersPage.test.tsx**: Rendering test for the characters page.
- **EpisodesPage.test.tsx**: Rendering test for the episodes page.
- **LocationsPage.test.tsx**: Rendering test for the locations page.
- **NotFoundPage.test.tsx**:Rendering test for the not found page.

## Styling

The application styling has been implemented using SCSS. The style files are located in the styles folder.

## Vite Configuration

The project uses Vite as the build tool. The Vite configuration is located in the vite.config.ts file.

## TypeScript Configuration

The TypeScript configuration is located in the tsconfig.json and tsconfig.node.json files.

## Jest Configuration

The Jest configuration is located in the jest.config.js file. The tests are set up in the jest.setup.js file.
