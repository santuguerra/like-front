import config from './config'
import firebase from './firebase'

const urlBack = config.getUrlBack()

const auth = {

    errorMessage: '',
    
    async login(userData, cb, errorCb) {
        this.errorMessage = ''
        firebase
            .auth()
            .signInWithEmailAndPassword(userData.email, userData.password)
            .then(async a => {
                if (a.operationType) {
                    const { user } = a
                    if (user) {

                        const data = JSON.stringify({ mail: userData.email })

                        // Obtenemos el id del usuario por mail.
                        // Si no existe, se crea y devuelve el nuevo id
                        fetch(urlBack + '/users', {
                            body: data,
                            method: 'post',
                            headers: {'Content-Type':'application/json'}
                        }).then(response => response.json())
                        .then(json => {

                            let userBack = json.response

                            localStorage.setItem('autenticado', true)
                            localStorage.setItem('user', JSON.stringify(user))
                            localStorage.setItem('userId', JSON.stringify(userBack.id))

                            cb()

                        })
                        .catch(error => console.log('no funciono: ', error))

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
        localStorage.removeItem('userId')
        localStorage.removeItem('likes')
        cb()
    },

    isAuthenticated() {
        return (localStorage.getItem('autenticado') && localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('autenticado')) : false
    },

    getUser() {
       return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    },

    getUserId() {
        return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('userId')) : null
    },

    async getLikes() {
        if (localStorage.getItem('userId')) {
            const data = await fetch(urlBack + '/likes/' + localStorage.getItem('userId'))
            
            if (data !== null) {
                return (await data.json()).response
            }

        } else {
            return []
        } 
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