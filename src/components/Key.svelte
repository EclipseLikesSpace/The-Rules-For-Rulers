<script>
    import KeyClass from './key_class.js';
    export let keyData = new KeyClass();
    export let id = null;
    export let name = null;
    export let rank = null;
    export let path = null;
    export let description = null;
    export let loyalty = null;
    keyData.loyalty = loyalty;
</script>

<span id={id} max-width="500px" class="key">
    <img id="defected" src="./../images/defected.png" alt="loyalty">
    <img id="logo" src={path} alt="key_image">
    <h3>{rank} {name}</h3>
    <h4><em>{rank}</em></h4>
    <p id="description">{description}</p>
    <p class="loyalty">Loyalty: <strong>{keyData.loyalty}</strong>%</p>
</span>

<style lang="scss">
    .key {
        position: relative;
        display: inline-block;
        padding: 0px;
        outline: none;
        border: 2px solid #404040;
        background-color: transparent;
        border-radius: 5px;
        width: 31.5rem;
        height: 15rem;
        margin: auto;
        transition-duration: 500ms;
        #logo {
            float: left;
            width: 100px;
            height: 100px;
            top: 7.5rem;
            left: 2rem;
            background: transparent;
            background-color: #bbb;
            border: 2px solid #404040;
            border-radius: 5px;
        }
        #defected {
            position: absolute;
            display: none;
            z-index: 100;
            max-width: 100%;
            max-height: 100%;
            margin-left: auto;
            margin-right: auto;
            width: 100%;
            height: 100%;
        }
        div:hover {
            border: 2px solid #00ff00;
            background-color: #404040;
            color: #00ff00;
        }

        strong { 
            font-weight: bolder;
        }
        h3 {
            position: relative;
            top: -20px;
            left: 10px;
        }
        h4 {
            position: relative;
            top: -55px;
            left: 20px;
            color: #707070;
        }
        p {
            position: relative;
            /*top: -80px;
            left: 120px;*/
            margin-top: -80px;
            margin-left: 120px;
        }

        .loyalty {
            position: relative;
            top: 10rem;
            right: 7rem;
        }
    }
    ::-moz-selection {
        color: rgb(255, 255, 255);
        background: rgb(0, 0, 0);
    }

    ::selection {
        color: rgb(255, 255, 255);
        background: rgb(0, 0, 0);
    }
</style>