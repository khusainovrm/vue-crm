<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">

    <router-link 
    v-for="link in links"
    :key="link.url"
    tag="li" 
    active-class="active"
    :exact="link.exact"
    :to="link.url"
    >
      <a href="#" class="waves-effect waves-orange pointer">{{ link.title }}</a>
    </router-link>
</ul>
</template>

<script>
import localazeFilter from '@/filter/localaze.filter'

export default {
  data: () => ({
    links: [
      {title:localazeFilter('Bill_name'), url: "/", exact: true},
      {title:localazeFilter('Bill_history'), url: "/history"},
      {title:localazeFilter('Bill_plan'), url: "/planing"},
      {title:localazeFilter('Bill_record'), url: "/record"},
      {title:localazeFilter('Bill_category'), url: "/categories"}
    ]
  }),
  props: ["value"]

}
</script>

<style>

</style>
