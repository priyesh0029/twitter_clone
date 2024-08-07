<template>
    <div>
        <div class="md:pt-12 space-y-2">
            <UIInput id="username" value="" label="username" placeholder="@username" v-model="data.username"/>
            <UIInput id="password" label="Password" placeholder="enter your password" type="password" v-model="data.password"/>
            <div>
                <UIButtonPost class="mt-8" liquid :disabled="isButtonDisabled" @click="handleLogin"><span>Login</span></UIButtonPost>
            </div>
            <p class="text-center">or</p>
            <div>
                <UIButtonPost liquid  @click="handleSignUp"><span>Signup</span></UIButtonPost>
            </div>
        </div>
    </div>
</template>

<script setup>
const { login } = useAuth();
// const signup = ref(false)
const data = reactive({
    password :'',
    username : ''
})

// function handleLogin(){
//     alert(JSON.stringify(data))
// }
const handleLogin = async () => {
  await login(data);
};

function handleSignUp(){
    navigateTo('/signup')
}

const isButtonDisabled = computed(()=> {
    return(!data.username && data.password)
})

</script>