<template>
  <div class="course-edit">
    <create-or-edit
      is-edit
      :course-id="courseId"
    ></create-or-edit>
  </div>
</template>

<script>
import CreateOrEdit from './components/CreateOrEdit'
export default {
  name: 'CourseEdit',
  props: {
    courseId: {
      type: [Number, String],
      required: true
    }
  },
  components: {
    CreateOrEdit
  }
}
</script>

<style lang="scss" scoped>

</style>
