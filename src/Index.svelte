<script>
    import Key from './Key.svelte';
</script>

<main>
    <head>
        <title>The Rules for Rulers</title>
        <link rel="shortcut icon" type="image/png" href="../images/rulers4rulers_logo_transparent.png">
    </head>
    <body>
        <Key
            id="general_test"
            name="General Ofsho"
            rank="General"
            path="./images/general.png"
            description="The general's purpose is to defend and protect the
            country, not enforce the laws. The enforcer does that, not the army."
            loyalty=100
        />
        <p id="lowerright"><a href="https://github.com/EclipseLikesSpace/The-Rules-For-Rulers" style="color: green;">Github</a></p>
    </body>
</main>

<style src="style.css">
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai+Looped:wght@200&display=swap');

    * {
        font-family: 'IBM Plex Sans Thai Looped', sans-serif;
        font-size: medium;
        transition-duration: 500ms;
        cursor: url("../images/cursor.cur"),url("../images/cursor.png"),default
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

    .center-image{
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

    #lowerleft {
        position: fixed;
        left: 1px; bottom: 1px;
    }

    #lowerright {
        position: fixed;
        right: 1px; bottom: 1px;
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