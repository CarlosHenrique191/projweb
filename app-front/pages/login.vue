<template>
    <div>
        <img src="static/Login.svg">
        <div class="login">
            <h2 class="text-center mb-5 title-login">Faça o login</h2>
            <b-form @submit="onLogin">
                <b-form-group
                    id="user-label"
                    label="Email:"
                    label-for="user-input"
                    description="We'll never share your email with anyone else."
                >
                    <b-form-input
                        id="user-input"
                        v-model="login.user"
                        type="email"
                        placeholder="Enter email"
                        required
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    id="password-label"
                    label="Senha:"
                    label-for="password-input"
                    description="Coloque a senha."
                >
                    <b-form-input
                        id="password-input"
                        v-model="login.pwd"
                        type="senha"
                        placeholder="Coloque a senha"
                        required
                    ></b-form-input>
                </b-form-group>

                <b-button type="submit">Entrar</b-button>
            </b-form>
        </div>
    </div>
</template>

<script>
export default {
    name: "Login",
    data(){
        return{
            login:{
                user:"user@email.com",
                pwd:"123"
            }
        };
    },

    methods:{
        doLogin(){
            let dataLogin = {
                user: this.login.user,
                pwd: this.login.pwd
            };
            this.$http.post("/api/login", dataLogin).then(response=> {
                dataLogin = {}
                console.log(response.data);
                this.$router.push("/");
            })
            .catch(errors=>{
                console.error("Falha no login")
                console.log(errors)
            });
        }
    }
};
</script>

<style>
    .title-login {
        font-weight: bold;
    }
    .login{
        margin: 50px 350px 0px 350px;
        padding: 50px 50px 20px 50px;
        border-radius: 30px;
        background-color: aquamarine;
    }
</style>