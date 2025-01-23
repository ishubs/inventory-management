Approach 

1. The API throws 429 status code (too many requests) when called more than once within in a few seconds
    To reduce the frequent API calls, Implemented caching strategy using react query. 
    It uses stale-while-revalidate as a caching strategy:
    Serves cached data instantly if available.
    Fetches fresh data in the background when cache becomes stale or when a component re-mounts.
2. Disabled the Value field in Edit product modal
    Value input field in the edit product modal can be auto calculated based on price and quantity, disabling the field reduces the chances of calculation errors
3. Used Redux for state management.
    Preferred to use redux over other state management libraries due to its scalable and structured nature. Using redux keeps state in a single object for the entire application, which ensures all the components in the application are in sync with each other
4. Used ant design and tailwindCSS for component and styling respectively. 
    ant design has all the basic ready to use UI components that can be easily customized using tailwindCSS and CSS, thus reducing the development time significantly
