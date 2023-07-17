# Users Test Cases

## Sign up
- If user does not exist, the new user gets created in the users table
- If user does exist, an error message displays telling them to log in
- User must proide an email address, password, and confirm password to create a user
- If a user is missing a required field, an error message displays

## Log in
- If user exists and correct credentials are provided, then user can successfully log in
- When user logs in, a JWT is created
- When user logs in, they are redirected to the landing page of the app
