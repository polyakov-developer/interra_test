<template>
  <div id="app">
    <Header />
    <main class="content-wrapper container">
      <router-view />
    </main>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  components: {
    Header,
  },
};
</script>

<style lang="scss">
:root {
  --headerBg: #091c28;
  --primary: #333333;
  --secondary: #edeeee;
  --info: #3399ff;
  --success: #66cc66;
  --warning: #ffe06d;
  --error: #ff7360;
  --disabled: #edeeee;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  height: 100%;
}

body {
  color: var(--primary);
  font-family: "Ubuntu";
  font-weight: 400;
  font-size: 11px;
  line-height: normal;
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-wrapper {
  flex: 1;
  padding-bottom: 23px;
  padding-top: 23px;
}

.container {
  background: #ffffff;
  box-shadow: 9px 0px 15px -6px rgba(0, 0, 0, 0.2);
  margin-left: auto;
  margin-right: auto;
  max-width: 866px;
  padding-left: 28px;
  padding-right: 28px;
  width: 100%;
}

.info {
  background-color: var(--info);
}

.success {
  background-color: var(--success);
}

.warning {
  background-color: var(--warning);
}

.error {
  background-color: var(--error);
}

.disabled {
  background-color: var(--disabled);
}
</style>
