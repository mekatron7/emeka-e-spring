export function login(credentials, users) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = users.find(u => u.username === credentials.username && u.password === credentials.password)
            if(user != null) resolve(user)
            else reject('The username or password you entered is invalid. Please try again.')
        }, 250)
    })
}