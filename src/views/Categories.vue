<template>
<div>
  <div class="page-title">
    <h3>Категории</h3>
  </div>
  <section>
    <Loader v-if="loading"/>
    <div class="row" v-else>

      <div >
        <CategoryCreatre @createCategory="createCategory"/>

        <CategoryEdit
          v-if="categories.length"
          :categories="categories"
          @updateCategory="updateCategory"
          :key="categories.length+categoryCounter"
        />
        <p  v-else >Категорий пока нет</p>
      </div>



    </div>
  </section>
</div>
</template>

<script>
import CategoryCreatre from '@/components/CategoryCreatre'
import CategoryEdit from '@/components/CategoryEdit.vue'


export default {
  data: () => ({
    categories: [],
    loading: true,
    categoryCounter : 0
  }),
  components: {
    CategoryCreatre,
    CategoryEdit
  },
  methods: {
    createCategory (category) {
      this.categories.push(category)
    },
    updateCategory(category) {
      const idx = this.categories.findIndex(c =>c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.categoryCounter++
    }
  },
  async mounted () {
    this.categories = await this.$store.dispatch("fetchCategories")
    this.loading = false
  }
}
</script>

<style>

</style>
