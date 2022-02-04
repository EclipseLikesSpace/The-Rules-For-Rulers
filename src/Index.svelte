<script>
    import Key from './components/Key.svelte';
</script>

<svelte:head>
    <title>The Rules for Rulers</title>
    <link rel="shortcut icon" type="image/png" href="../images/rulers4rulers_logo_transparent.png">
</svelte:head>
<body>
    <span id="key-container" style="border: 2px solid #aaa; display: inline-block; width: 75rem;">
        <h1 class="center">Keys</h1>
        <Key
            id="general_ofsho"
            name="Ofsho"
            rank="General"
            path="./images/general.png"
            description="The general's purpose is to defend and protect the
            country, not enforce the laws. The enforcer does that, not the army."
            loyalty=78
        />
        <Key
            id="scientist_rstar"
            name="RStar"
            rank="Scientist"
            path="./images/scientist.png"
            description="The scientist is to research technology and weaponry for
            you, your general and your army."
            loyalty=92
        />
        <Key
            id="king_you"
            name="You"
            rank="King"
            path="./images/you.png"
            description="This is you. That's it. You are the king. You are the leader, got that?"
            loyalty='Infinity'
        />
        <Key
            id="enforcer_eclipse"
            name="Codename Eclipse"
            rank="Enforcer"
            path="./images/enforcer.png"
            description="The Enforcer enforces the law. The Enforcer is one of the most important keys in the game. Without the Enforcer, your country will fall into chaos."
            loyalty=74
        />
    </span>
    <p ><a id="github" href="https://github.com/EclipseLikesSpace/The-Rules-For-Rulers">Contribute on Github!</a></p>
</body>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai+Looped:wght@200&display=swap');

    * {
        font-family: 'IBM Plex Sans Thai Looped', sans-serif;
        font-size: medium;
        transition-duration: 500ms;
        cursor: url("../images/cursor.cur"),url("../images/cursor.png"),default
    }

    #github {
        position: fixed;
        bottom: 0;
        right: 0;
        font-size: x-large;
        color: green;
    }

    h1 {
        font-size: 48px;
        text-decoration: underline;
        text-decoration-color: #7a7a7a;
    }

    h2 {
        font-size: 34px;
    }

    h3 {
        font-size: 21px;
    }

    .center .image{
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 100%;
    }

    .banner {
        text-decoration: underline;
        text-decoration-color: #7a7a7a;
        text-align: center;
    }

    footer {
        background-color: #aaaaaa;
    }

    button {
        outline: none;
        border: 2px solid #404040;
        background-color: transparent;
        border-radius: 5px;
        color: #202020;
        size: 150px;
        transition-duration: 500ms;
        width: 4rem;
        height: 4rem;
    }

    center {
        text-align: center;
    }

    .center {
        text-align: center;
    }

    button:hover {
        background-color: #d3d3d3;
    }

    .dark {
        background-color: #202020;
        color: #f5f5f5;
        transition-duration: 500ms;
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
