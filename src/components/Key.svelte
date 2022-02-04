<script>
    import Key from './key_class.js';
    export let keyData = new Key();
</script>

<span id={keyData.id} max-width="500px" class="key">
    <img src={keyData.path} alt="key_image">
    <h3>{keyData.rank} {keyData.name}</h3>
    <h4><em>{keyData.rank}</em></h4>
    <p id="description">{keyData.description}</p>
    <p class="loyalty">Loyalty: <strong>{keyData.loyalty}</strong>%</p>
</span>

<style lang="scss">
    .key {
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
        img {
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