# Overview

**BlockSim** is the three\-dimensional, platform\-independed simulator of brick/block building\. The simulation is inspired by standard Lego bricks and by games such as Minecraft, Tetris and, Blockout\. 

In the three\-dimensional space, you can build something object using bricks made of cubic blocks\. In the space, there are not any gravity constraint and the bricks can be colorful\. You can move the camera around the built object and inside the object if the object has any holes or corridors like in most FPP/FPS games\.

Every brick has two colors choosen from the 125\-color palette arranged as 5x5x5 red\-green\-blue model\. The first color is the face color and the second color is the frame color\. Both colors can be the same color and the frame will be invisible\. The background and cursor color also can be choosen from the same palette\.

You can freely create any brick, move and rotate them\. You can cut/copy/pasteand change color of existing block\.

# User interface

The user interface of **BlockSim** consists of modules with possibility of arrangement\. The modules are arranged as list within single column or within two columns\.

Below, these modules are named and described by the default order within single column\.

The setting table is not a module and can not be moved\.

## Screen

Displays the building workspace\. After clicking the screen, the keyboard events will be captured, so you can move camera and cursor using the keyboard\. You can disable keyboard capture by clicking any button in the **Control** module\.

## Control

There are four similar control sets user for camera and cursor management\. Clicking any button in the module, the keyboard will not be captured\.

Each set consists of the following elements:


* **Set name and values** \- If you click the button, there will be displayed three prompts, which allows you to set exactly value of each coordinate\. The brackets indicates, that currently keyboard is captured\.
* **Arrows** \- The six buttons allow you for move or change something step\-by\-step\.
* **One step** \- After clicking the button, if you click and hold any arrow button, the something will be moved/changed by one step only\.
* **Continuous** \- After clicking the button, if you click and hold any arrow button, the something will be moved/changed continuously until leave the arrow button\.

There are the following four sets:


* **Move** \- Camera movement without rotating, the values are the block coordinates multiplied by 10\. Single step is the 10, which equals the single block size\.
* **Rotate** \- Camera rotation without movement\. the values are the orientation angle in degrees\. Single step is the 5 degress\.
* **Position** \- Cursor position, the values are the cursor position\. If the cursor size is greater than 1x1x1, the position is the position of hot spot\.
* **Size** \- Cursor size, the values are the cursor size and value sign indicates position of the hot spot\. 

## State

The module consists of 6 buttons, which works like a radio buttons and allows to select the cursor state, which affects the cursor movement\. Current state is indicated by braces\. Possible states are following:


* **Cursor** \- Move cursor without changing anything\.
* **Color** \- Change color of bricks to currently selected color\.
* **Add** \- Add the block for create new brick or change brick shape\.
* **Erase** \- Erace the block for remove the brick or change brick shape\.
* **Move** \- Move all bricks being under the cursor\. The cursor movement is possible only when the brick movement is possible\.
* **Rotate** \- Change the brick orientation by rotating around the hot spot\. In this state, the cursor will be rotated instead of movement if you use the position controls\.

## Clipboard

The module consists of the following four buttons, which function are similar to most applications and description is not necessary:


* **Cut**
* **Copy**
* **Paste**
* **Delete**

The action will be affected for all bricks, which are under the cursor\. **BlockSim** uses internal clipboard instead of OS clipboard\.

## Color

There is the color selector for all four scene elements:


* **Face** \- Face of the current brick or for the blocks, which will be added\.
* **Frame** \- Frame of the current brick or for the blocks, which will be added\.
* **Back** \- Global background color\.
* **Cursor** \- Global cursor color, when cursor is shown outside of any block\.

Each color can be choosen from palette containing 125 colors, which are arranged as red\-green\-blue model with 5 steps for each channel\. The color can be selected by one of two ways, depending of currently selected color layout\.

### Color \- buttons

For each color kind and color channel there are five buttons, which allows to choose channel value\. The current value is indicated by brackets\.

### Colors \- Inc/dec

For each color kind and color channel there are two buttons\. The value on noth buttons indicated the current channel value\. The left button decreases the value and the right button increases the value\.

## CameraAngle

This module allows to change the camera view angle\. Its consists of 5 buttons:


* **Fast tele** \- Decrease angle by 10 degrees\.
* **Slow tele** \- Decrease angle by 1 degree\.
* **Angle value** \- Show current angle value and set arbitrary angle\.
* **Slow wide** \- Increase angle by 1 degree\.
* **Fast wide** \- Increase angle by 12 degree\.

The camera view angle can be between 1 \(extremely tele\) and 179 \(extremely wide\)\.

## UndoRedo

This module allows to undo or redo any action, which changes the object\. Its consists of two buttons only:


* **Undo** \- Undo last scene changes\.
* **Redo** \- Redo undone scene changes\.

## Storage

There is the global storage for scenes, objects and views\. The storage purpore can be as following:


* Quickly save and load scenes\.
* Save objects for use in another scene\.
* Use as multi\-object clipboard\.
* Create views for quickly switch between several views\.

The module consists of three elements:


* **Text field** \- The name of element for save or remove\.
* **Buttons**:
  * **Scene** \- Save whole scene\.
  * **Object** \- Save bricks under the cursor\.
  * **View** \- Save camera view only\.
  * **Remove** \- Remove formerly saved storage element\.
* **Stored elements** \- The alphabetically\-sorted list of all stored items\. Initially, the list is blank\. You can click one of the item names for retrieve object and the retrieving action will be as following, depending on item type:
  * **Scene** \- Replace the current scene with the retrievet scene\.
  * **Object** \- Paste the object at current cursor place\. If some blocks existing in the scene are conflicted with the retrieved object, the retrieved object will not be pasted\.
  * **View** \- Change camera view without modifying the scene and cursor\.

If you retrieve any item, the element name will be pasted in the text field\. This features allows to easy replace or remove the item\. For remove any item, retrieve the item by clicking on the name and click the **Remove** button\. Any item can be replaced with item of any type, the replacement is the same as remove item followed by save item using the name of formerly removed item\.

## Text

The module consists of several buttons and multiline text field\. Its purpose is import and export items as text, which you can save on your device\.

These buttons has the following actions:


* **Sparse** \- Generate text describing whole scene in sparse format\.
* **Dense** \- Generate text describing whole scene in dense format\.
* **Object** \- Generate text describing object under cursor\.
* **View** \- Generate text describing current camera view only\.
* **Retrieve** \- Aquire the text from field and read as scene/object/view depending on text description\.

Below the text field, there are two additional buttons:


* **Copy** \- Copy text from field to clipboard\.
* **Paste** \- Paste text from clipboard to field\. Thic action may not work on some operating systems and browsers or may require additional acceptation in browser\.

### Saving

For save scene/object/view, click one of the buthons other than **Retrieve**\. The text description will be written in the field\. Copy and save the text\.

### Retrieving

For retrieve item, paste the text description into the field and click the **Retrieve** button\. The item kind \(scene, object, view\) will be recognized automatically\.

# Keyboard

You can use your keyboard for some actions\. Before it, you have to click the **Screen**, the keyboard capture will be enabled and the fact will be indicated as brackets around set names in the **Control** module\. For disable keyboard capture, click any button in **Control** module\.

The **BlockSim** is optimized for standard QWERTY keyboard and you can use the following keys:


* **W**, **S**, **A**, **D**, **Q**, **E** \- Move camera\.
* **I**, **K**, **J**, **L**, **U**, **O** \- Rotate camera\.
* **T**, **G**, **F**, **H**, **R**, **Y** \- Move or resize cursor \(switched by **N** and **M** keys\)\.
* **N** \- Switch to cursor move using **T**, **G**, **F**, **H**, **R**, **Y** keys\.
* **M** \- Switch to cursor resize using **T**, **G**, **F**, **H**, **R**, **Y** keys\.
* **\-\_** \- Decrease camera view angle \(tele\)\.
* **=\+** \- Increase camera view angle \(wide\)\.
* **\[\{** \- Undo\.
* **\]\}** \- Redo\.
* **1**, **2**, **3**, **4**, **5**, **6** \- Select one of the six cursor states\.
* **Z** \- Delete\.
* **X** \- Cut\.
* **C** \- Copy\.
* **V** \- Paste\.

# Refresh and retention

BlockSim preserves the current state \(current scene, cursor position and size, undo/redo buffer etc\.\) after closing\. For reset application, refresh it three times without any action such as cursor movement or adding/erasing blocks\. This feature avoids from lose of unsaved work if you accidentally close web browser or refresh application\.

# Settings

Below the application interface, there is the form of settings with following meaning:


* **Canvas width** \- Canvas width in **Screen** module\.
* **Canvas height** \- Canvas height in **Screen** module\.
* **Text field size** \- Number of lines in text field in **Text** module\.
* **Text font size** \- Font size of text field in **Text** module\.
* **Control button size** \- Height of buttons with names and coordinates in **Control** module\.
* **Other button size** \- Height of all buttons other than mentioned above\.
* **Button font size** \- Font size of all buttons\.
* **Control repeat time** \- Time in milliseconds between repeated action in continuous state for every arrow in **Control** module\.
* **Arrow layout** \- Select one of two layouts with several variants differing the space size in **Control** module:
  * **Four X** \- All four control sets, recommended in most cases\.
  * **Two X** \- Display two control sets at once\. Between control sets, there are **\#** buttons, which switch between visible control sets\. Usable in very narrow screen like vertically holded smartphone\.
* **Color layout** \- Select one of two color button layouts in **Color** module:
  * **Buttons** \- Display all five buttons per every color channel, which sets the color value\. Recommended in most cases\.
  * **Inc/dec** \- Display only two buttons per every color channel, which increments or decrements the current color value\. Usable, when the **Buttons** layout creates too small buttons\.
* **Arrangement** \- Enable or disable interface arrangement possibility\.

Every setting takes effect immediatelly\.

# Interface arrangement

While **Arrangement** setting is enabled, there are additional button outside the modules\. You can reorder the modules or split the interface into two columns\.

At the most top of screen, there are the buttons with horizontal arrow with vertical bar\. The buttons moves the column split line\.

Below the mentioned split button, there are button with horizontal arrow\. The button moves the top most module into the other column\. For example, the left arrow button in the right column moves the first module into the left column\.

Between modules, there are buttons with vertical up\-down arrow\. This button swaps the two modules around this button\.

For choose the emodule to move from the column to ther column, use the swap buttons to move the module into the top most position\. After this, you can move the module using the horizontal arrow button\.




