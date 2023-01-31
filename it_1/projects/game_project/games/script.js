const column1 = document.getElementById('column1');

const column2 = document.getElementById('column2');

const column3 = document.getElementById('column3');

const all_columns = document.getElementById("all_columns")

const color_columns = document.querySelectorAll(".color_columns")

column1.addEventListener("mouseover", overcol1);

if (column1.onfocus)
{
    overcol1()
}
if (column2.onfocus)
{
    overcol2()
}
if (column3.onfocus)
{
    overcol3()
}


column2.addEventListener("mouseover", overcol2);
column3.addEventListener("mouseover", overcol3);


//These functions expands hovered column and shrinks non hovered columns 
function overcol1()
{  
    column1.style.flex = "1";
    column2.style.width = "33.333%";
    
    column2.style.flex = "0";
    column2.style.width = "50px";
    
    column3.style.flex = "0";
    column3.style.width = "50px";

}

function overcol2()
{  
    column2.style.flex = "1";
    column2.style.width = "33.333%";
    
    column1.style.flex = "0";
    column1.style.width = "50px";
    
    column3.style.flex = "0";
    column3.style.width = "50px";

 
}

function overcol3()
{  
    column3.style.flex = "1";
    column3.style.width = "33.333%";
    
    column2.style.flex = "0";
    column2.style.width = "50px";
    
    column1.style.flex = "0";
    column1.style.width = "50px";
}


color_columns.forEach((column) => 
{   
    
    let color_columns_array = Array.from(color_columns);
    
    //If a column is hovered
    column.addEventListener('mouseover', event => {

        for (let i = 0; i < 3; i++) {

            //If items not hovered
            if (i != color_columns_array.indexOf(column))
            {
                //Changes syle of h2 and makes all children invicible
                //(opacity 0)
                h2 = color_columns[i].getElementsByTagName("H2")[0]
                h2.setAttribute("style", "position: absolute; bottom: 2vh; transform: rotate(90deg); min-width: 100vh; width: 100%; text-align: bottom; transform: rotate(-90deg); transform-origin: 0 0 0; opacity: 1;")

                color_columns[i].querySelectorAll("*").forEach((el) => {el.style.opacity = "0"});   
            }

            //If column hovered
            else
            {
                //when a column is hovered, this code changes the style of h2, which changes form being
                //alligned vertically to being alligned horizontally
                //also changes opacity of all children to 1, which makes them 
                //visible
                h2 = color_columns[i].getElementsByTagName("H2")[0]
                h2.setAttribute("style", "bottom: 2vh; position: absolute; text-align: center; width: 100%; margin: 0; font-size: 3vh; text-align: bottom; transform: rotate(0deg); transform-origin: none;")
                
                color_columns[i].querySelectorAll("*").forEach((el) => {el.style.opacity = "1"});
            }
        }
    })
})
