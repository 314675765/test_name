<template>
  <div id="app">
    <header>
      <h1>Welcome to Vue 3</h1>
    </header>
    <main>
      <p>This is a simple Vue 3 application.</p>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

header {
  background-color: #42b983;
  padding: 20px;
  color: white;
}

main {
  margin: 20px;
}
</style>