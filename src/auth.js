import firebase from './firebase'

const auth = {

    errorMessage: '',
    
    async login(userData, cb, errorCb) {
        this.errorMessage = ''
        firebase
            .auth()
            .signInWithEmailAndPassword(userData.email, userData.password)
            .then(a => {
                if (a.operationType) {
                    const { user } = a
                    if (user) {
                        localStorage.setItem('autenticado', true)
                        localStorage.setItem('user', JSON.stringify(user))
                        cb()
                    }
                } else {
                    console.log('no funciono')
                }
            })
            .catch(error => { 
                errorCb(error.message)
            })
    },

    logout(cb) {
        localStorage.setItem('autenticado', false)
        localStorage.removeItem('user')
        cb()
    },

    isAuthenticated() {
        return (localStorage.getItem('autenticado') && localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('autenticado')) : false
    },

    getUser() {
       return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    },

    error() {
        return this.errorMessage
    },

    register(userData, cb) {

        firebase
            .auth()
            .createUserWithEmailAndPassword(userData.email, userData.password)
            .then(a => {
                console.log(a)
                firebase
                    .auth().currentUser.sendEmailVerification()
                    .then( () => {
                        console.log('se envio la confirmación')
                    })
                cb()
            })
            .catch(error => console.log(error))
            
    }

}

export default auth