<script>
    export let id = null;
    export let name = null;
    export let rank = null;
    export let path = null;
</script>

<div id={id} max-width="500px" class="key">
    <img src={path} alt="key_image">
    <h3>{rank} {name}</h3>
    <h4><em>{rank}</em></h4>
    <p>Hello, world!</p>
</div>

<style>
    .key {
        outline: none;
        border: 2px solid #404040;
        background-color: transparent;
        border-radius: 5px;
        width: 500px;
        margin: auto;
        transition-duration: 500ms;
    }

    .key img {
        float: left;
        width: 100px;
        height: 100px;
        background: transparent;
        border: 2px solid #404040;
        border-radius: 5px;
    }

    .key h3 {
        position: relative;
        top: -20px;
        left: 10px;
    }
    .key h4 {
        position: relative;
        top: -55px;
        left: 20px;
        color: #707070;
    }
    .key p {
        position: relative;
        top: -80px;
        left: 120px;
    }
</style>