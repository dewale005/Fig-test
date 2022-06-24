

const isAuthenticated = () => {
    const isAuthenticated = localStorage.getItem('auth');
    if (isAuthenticated) {
        return true
    } else {
        return false
    }
}

module.exports =isAuthenticated