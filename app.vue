<template>
  <MySection>
    <div class="content">
      <img class='logo' src="@/assets/img/descarga.png" alt="Descarga" />

      <h1 class='title'>Search your category</h1>

      <div class="categories-container">
        <pre class='categories-json small-text'>{{ categories }}</pre>

        <input class='input-search' v-model="searchTerm" placeholder="Search category" />
        <button class='search-button' @click="searchCategory">Search</button>
      </div>

      <Transition name='fade'>
        <p v-if="searchResult">{{ searchResult }}</p>
      </Transition>
    </div>
  </MySection>
</template>

<script setup lang="ts"> 
  import MySection from './components/atoms/MySection.vue';

  import { type Category, fetchCategories, getCategoryPath } from './services/categoryService';

  const categories = ref<Category[]>([]);
  const searchTerm = ref('');
  const searchResult = ref<string | null>(null);

  const fetchData = async () => {
    categories.value = await fetchCategories();
  };

  const searchCategory = () => {
    searchResult.value = getCategoryPath(categories.value, searchTerm.value) || 'Not found';
  };

  onMounted(() => {
    fetchData();
    document.title = 'Bershka';
  });
</script>

<style lang="scss" scoped>
  @use '@/assets/styles/breakpoints';
  @use '@/assets/styles/colors';
  @use '@/assets/styles/spacing';

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;

    .logo {
      width: 200px;
      margin-bottom: spacing.set-space(4);

      @media(min-width: breakpoints.$lg) {
        margin-bottom: spacing.set-space(7);
      }
    }

    .title {
      margin-bottom: spacing.set-space(4);
    }

    .categories-container {
      display: flex;
      flex-direction: column;
      margin-bottom: spacing.set-space(3);

      .categories-json {
        padding: spacing.set-space(2) spacing.set-space(2);
        margin-bottom: spacing.set-space(3);
      }

      .input-search {
        padding: spacing.set-space(0.5);
        margin-bottom: spacing.set-space(1);
        text-align: center;
      }

      .search-button {
        padding: spacing.set-space(1);
        background-color: colors.$primary;
        color: colors.$white;
        text-transform: uppercase;
      }
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>