<script>

    function Collatz(n) {
        if (n % 2) return 3 * n + 1;
        return n / 2;
    }

    const defaultInt = 12;
    let currInt = defaultInt;

    function isPositiveInt(data) {
        if (typeof data !== "number" || isNaN(data) || data <= 0 || (data % 1)) return false;
        return true;
    }

    function handleClick() {

        currInt = Collatz(currInt);

        setTimeout(() => {
            if (currInt === 1) {
                alert("You have reached 1!");
                currInt = defaultInt;
            }
        }, 0);
        
        return;
    }

    function handleBlur(e) {
        if (!e.target.value) {
            alert("Please enter a positive integer!")
            currInt = defaultInt;
            return;
        } else if (isPositiveInt(Number(e.target.value))) {
            currInt = Number(e.target.value)
        } else {
            alert("Input must be a positive integer!");
            currInt = defaultInt;
            return;
        }
    }

    let showMoreInfo = false;

    const showText = "Show more 3x+1 info";
    const hideText = "Hide more 3x+1 info";

    function toggleInfo () {
        if (!showMoreInfo) {
            document.querySelector("#toggleInfoButton").innerHTML = hideText;
            showMoreInfo = true;
            return;
        }
        document.querySelector("#toggleInfoButton").innerHTML = showText;
        showMoreInfo = false;
        return;
    };

</script>

<div>
    <h1>3x+1 Tester</h1>

    <center>
        <input
            type="text"
            id="theInt"
            placeholder="myInt"
            size="8"
            value={currInt}
            on:blur={handleBlur}
            />
    </center>

    The (in)famous <em><strong><span class="definition">3x+1 conjecture</span></strong></em> predicts that if we start with <em>any</em> positive integer x and iteratively compute either 3x+1 if x is odd or x/2 if x is even, then we will <em>always</em> eventually arrive at the number 1.

    <p/>

    To test the conjecture, enter a positive integer (or use the default {defaultInt}) and then <button id="CollatzButton" on:click={handleClick}>run </button> the function!

    <p/>

    <small>
    <button on:click={toggleInfo} id="toggleInfoButton">
        {showText}
    </button>

    {#if showMoreInfo}
        <br/>
        The 3x+1 conjecture was proposed by Collatz in 1937 (and is also called the "Collatz conjecture"). To this day, it remains wide open &mdash; and widely regarded as extremely difficult! As of 2020, it has been computer-verified for all starting values up to 2<sup>68</sup>&thickapprox;2.95&times;10<sup>20</sup>. For even more information, see the
        <a href="https://en.wikipedia.org/wiki/Collatz_conjecture" target="_blank">
            wikipedia page
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
        </svg>
        </a>.
    {/if}
    </small>
</div>

<style>
    #theInt {
        padding: 2px;
        background-color: rgb(249, 249, 249);
        text-align: center;
        font-size: 50px;
        /* color: rgb(110, 135, 69); */
    }
    #CollatzButton {
        padding: 2px;
        background-color: rgb(234, 234, 234);
    }
    #toggleInfoButton {
        padding: 2px;
        background-color: rgb(234, 234, 234);
    }
    a {
        color: rgb(110, 135, 69)
    }
</style>