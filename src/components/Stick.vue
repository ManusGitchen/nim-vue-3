<template>
    <div class="stick">
        <div class="stick-head"></div>
        <div class="stick-body"></div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.stick {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: .2rem;

    &-head {
        border-radius: 50%;
        background: red;
        border-color: red;
        height: .5rem;
        width: .5rem;
    }

    &-body {
        height: 3rem;
        width: .5rem;
        background: lightgrey;
        border-color: grey;
    }
}
</style>