<template>
  <div class="min-h-screen">
    <router-view v-slot="{ Component }">
      <transition 
        name="fade" 
        mode="out-in"
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 transform scale-95"
        enter-to-class="opacity-100 transform scale-100"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 transform scale-100"
        leave-to-class="opacity-0 transform scale-95"
      >
        <component :is="Component" />
      </transition>
    </router-view>
    <NotificationListener />
  </div>
</template>

<script>
import NotificationListener from './components/NotificationListener.vue';

export default {
  name: 'App',
  components: {
    NotificationListener
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
