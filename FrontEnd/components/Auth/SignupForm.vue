<template>
    <div class="flex justify-center items-center">
        <div class="md:pt-12 space-y-2">
           <div class="flex space-x-1">
            <UIInput id="name" value="" label="name" placeholder="@name" v-model="data.name"/>
            <UIInput id="username" value="" label="username" placeholder="@username" v-model="data.username"/>
           </div>
            <UIInput id="email" value="" label="e-mail" placeholder="@e-mail" v-model="data.email"/>
            <UIInput id="password" value="" label="Password" placeholder="enter your password" v-model="data.password"/>
            <!-- <UIInput value="" label="Re-password" placeholder="re-enter your password" v-model="data.repassword"/> -->

            <div>
                <UIButtonPost liquid :disabled="isButtonDisabled" @click="handleSignUp"><span>Signup</span></UIButtonPost>
            </div>
            <p class="text-center">or</p>
            <div class="flex justify-center items-center">
                <p>already have an account!</p> <br>
                <button @click="handleLogin" class="text-blue-500 underline ml-2 text-lg">Login</button>
            </div>
        </div>
    </div>
</template>

<script setup>
// const signup = ref(false)
const { signup } = useAuth();

const data = reactive({
    name : '',
    password :'',
    email: '',
    username : ''
})

const handleSignUp = async()=>{
    // const credentials = { email: email.value, password: password.value };
   try {
    console.log(data);
    await signup(data);
   } catch (error) {
    console.log(error);
    
   }
}

function handleLogin(){
    navigateTo('/login')
}

const isButtonDisabled = computed(()=>{
    return !(data.username && data.password && data.email && data.name)
})

</script>