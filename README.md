<h1>Simple To-Do Application</h1>
<h2>Powered by Node.js modules</h2>

<h3>Overview</h3>
<p>A simple to-do application that stores data in a JSON file and logs actions in a txt file to keep what you do. <br>
This project is created in completion to the course: Applications Development 2.</p>

<h3>Scope Functions</h3><hr>
<ul>
    <li>Create to-do: Creates a task composed of Title and Task status</li>
    <li>Read to-do: Displays all of your current tasks stored</li>
    <li>Update to-do: Updates the task status of your task</li>
    <li>Delete to-do: Deletes a task to keep your record clean</li>
</ul>

<h2>Instructions</h2>
<p> I advise you to follow these how-to steps in order to install, run, and test the application successfully.</p>

<h3>How to install</h3><hr>
<ul>
    <li>In your CMD, go to your desired file location and run this command: 
        <br>&nbsp; 
        <i> git clone https://github.com/Fourthhy/appdev2-midterm-project.git </i> 
    </li>
    <li>After cloning the repository, open your VsCode by entering this command: 
        <br>&nbsp; 
        <i>code .</i>
    </li>

</ul>

<h3>How to run the server</h3><hr>
<ul>
    <li>In your CMD or VsCode terminal, run the server by entering: 
        <br>&nbsp; 
        <i>node server.js</i>
    </li>
</ul>

## Ways to test
### <span title>Creating a Task</span>
<p>1. While the server is running, head to the <b>Thunder Client</b></p>
<p>2. Enter <b>http://localhost:3000/todos</b> and set the method to <b>POST</b>just like what is shown in the image:</p>
<img src="./guide_images/create_task_1.JPG" alt="guide_image_1" >
<p>3. Under the <b>Body</b> section, enter the <b>title</b> of your task, follow the format in the image:</p>
<img src="./guide_images/create_task_2.JPG" alt="guide_image_2" >
<p>4. Make sure to follow the format, and hit <b>Send</b> to send request</p>
<img src="./guide_images/create_task_3.JPG" alt="guide_image_3" >
<p>The step 4 should expectedly give you this response:</p>
<img src="./guide_images/create_task_4.JPG" alt="guide_image_4" >
<p>Also will enter your task in the <b>todos.json</b>:</p>
<img src="./guide_images/create_task_5.JPG" alt="guide_image_5" >
<p>Also will enter your log in the <b>logs.txt</b>:</p>
<img src="./guide_images/create_task_6.JPG" alt="guide_image_6" >

### <span title>Reading a Task / Tasks</span>
<p><b>Fetching All Tasks</b></p>
<p>1. While the server is running, head to the <b>Thunder Client</b></p>
<p>2. Enter <b>http://localhost:3000/todos</b> and set the method to <b>GET</b>just like what is shown in the image:</p>
<img src="./guide_images/read_task_1.JPG" alt="guide_image_7" >
<p>3. Click <b>Send</b> to send request and should expectedly give you this response</p>
<img src="./guide_images/read_task_2.JPG" alt="guide_image_8" >
<hr><p><b>Fetching A task</b></p>
<p>1. In the same running environment, set the URL to <b>http://localhost:3000/todos/1</b>, replace 1 with any ID of task available, set the method to <b>GET</b> and hit <b>SEND</b></p>
<p>Step 1 should expectedly give this response: </p>
<img src="./guide_images/read_task_3.JPG" alt="guide_image_9" >
<hr><p><b>Fetching A completed task</b></p>
<p>1. In the same running environment, set the URL to <b>http://localhost:3000/todos?completed=true</b>, set the method to <b>GET</b> and hit <b>SEND</b></p>
<img src="./guide_images/read_task_4.JPG" alt="guide_image_10" >
<p>Step 1 should expectedly give this response: </p>
<img src="./guide_images/read_task_5.JPG" alt="guide_image_11" >
<p>Why is it empty? because you haven't done anything silly!</p>

### <span title>Noticed the differences?</span>
<p>The response you get from using <b>http://localhost:3000/todos</b> is enclosed in an array, meaning that is all the task stored in todos.json. However, when used <b>http://localhost:3000/todos/1</b> which targets a specific ID, the response returned is an object data type, meaning it returns only the target task.</p>
<p>But why using <b>http://localhost:3000/todos?completed=true</b> stores the result in an array? Because it fetches all of the task under the condition of being completed.</p>

### <span title>Updating a Task</span>
<p>1. In the same running environment, set the URL to <b>http://localhost:3000/todos/1</b>, replace 1 with any ID of task available, set the method to <b>PUT</b>, just like what is shown in this image: </p>
<img src="./guide_images/update_task_1.JPG" alt="guide_image_12" >
<p>2. Under the <b>Body</b> section, enter the <b>completed</b> key and update to <b>true</b>, follow the format in the image:</p>
<img src="./guide_images/update_task_2.JPG" alt="guide_image_13" >
<p>3. Click <b>Send</b> to send request and should expectedly give you this response</p>
<img src="./guide_images/update_task_3.JPG" alt="guide_image_14" >
<p>Repeat fetching the task using the <b>http://localhost:3000/todos?completed=true</b> to see if you completed anything</p>

### <span title>Deleting a Task</span>
<p>1. In the same running environment, set the URL to <b>http://localhost:3000/todos/1</b>, replace 1 with any ID of task available, set the method to <b>DELETE</b>, just like what is shown in this image: </p>
<img src="./guide_images/delete_task_1.JPG" alt="guide_image_15" >
<p>2. Click <b>Send</b> to send request and should expectedly give you this response</p>
<img src="./guide_images/delete_task_2.JPG" alt="guide_image_16" >

### <span title>Feel free to explore! Made by:</span>
## <span title>Fourthhy</span>






