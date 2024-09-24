<template>
  <form @submit.prevent="login">
    <h1>Login</h1>
    <div>
      <label for="email">Email</label>
      <input type="email" v-model="form.email" required id="email" name="email"  placeholder="Enter your email"/>
    </div>
    <div>
      <label for="password">password</label>
      <input type="password" v-model="form.password" required id="password" name="password" placeholder="Enter your passworfd"/>
    </div>
    <button type="submit">login</button>
    <button type="button" @click="redirectToRegister" class="login-button w-full py-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700">Not registered? register here</button>
  </form>
</template>
<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const form = ref({
      email: '',
      password: ''
    });

    const login = () => {
      const usersData = JSON.parse(localStorage.getItem('users')); // Get array of users

      if (usersData && usersData.length > 0) {
        // Find the user in the array by matching email and password
        const userData = usersData.find(user => user.email === form.value.email && user.password === form.value.password);
        
        if (userData) {
          alert("Login successful");
          localStorage.setItem('isLoggedIn', 'true');

          // Redirect based on user role
          if (userData.role === 'admin') {
            router.push('/'); // Redirect to admin dashboard
          }
          else if (userData.role === 'user') {
            router.push('/studentdashboard'); // Redirect to user dashboard
          }
        } else {
          alert("Invalid email or password");
        }
      } else {
        alert("No users found in the system");
      }
    };
      
    const redirectToRegister = () => {
      router.push('/register'); 
    };


    return {
      form,
      login,
      redirectToRegister
    };
  }
}

</script>

<style>
form {
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-weight: bolder;
}

div {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #555;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.3s;
}

input[type="email"]:focus,
input[type="password"]:focus {
  border-color: #007bff;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 10px;
}

button:hover {
  background-color: #0056b3;
}

@media (max-width: 600px) {
  form {
    padding: 20px;
    margin: 20px auto;
  }
}

</style>