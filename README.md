# GitHub Repositories List

This application uses ReactJS to call the open GitHub's API to load the basic user and his repositories data. 

The proposal of this project is apply the **useReducer** hook to improve maintainability for the code. In addition, the **Debounce** resource was implemented in the search field to minimize requests to the GitHub API.

Below, the application UI showing a successful search:

![preview](https://user-images.githubusercontent.com/54327441/105737962-4adecf00-5f15-11eb-8299-6bcafab8a023.png)

The cases where no user is found are handled with error messages.