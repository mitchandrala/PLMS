## Parking Lot Management System

### Setup Instruction:

1. Install the Required Packages:  
```npm install ```
2. Start Development Server:  
   `npm run dev `

### Tech Stack:

Frontend: ReactJS  
UI Library: Mantine UI, Tailwind CSS  
Logic Building: JavaScript  
State Management: Context API, React State  

### All Page
1. Home Page
2. Dashboard Page
3. Book Slot Page
4. View And Manage Page
5. Slot History Page

**Page Details:**
1. Home Page:  
   Welcome and Dashboard page redirect link.

2. Dashboard Page:  
   Display Value of Total Slots, Available Slots, Occupied Slots, Total Bikes, Total Cars, Total SUVs, and Total Revenue.   

3. Book Slot Page:  
   Display form to book slot form contain(Vehicle No, Vehicle Type, Manually or Automatic Slot check box, Slot select Input, Entry Time.  
   Vehicle Type - BIKE,CAR,SUV.  
   Slot rule - (A1-A5,B1-B5,C1-C5) for A1-A5 -> BIKE & CAR, for B1-B5 -> CAR & SUV, C1-C5 -> BIKE,CAR,SUV.  
   If automatic slot is selected then assign A1-A2-A3....C5 if no slot is available -> Display Slot Is full.  
   Slot Select Input is visible to select if automatic slot is unchecked. It only display slot name which is not assigned and support vehicle type.  
     
5. View And Manage Page:  
   Display List of all slot.
   Display details of slot if it is booked and also Display RELEASE Button.  
   If click on RELEASE button then it show charge and duration for particular slot and slot data move to history and slot become available.  
   Search by Vehicle No, Filter by Vehicle Status & Filter by Slot Status.  

6. Slot History Page:  
   Display slot details Vehicle Number, Vehicle Type, Slot, Parking Duration, Parking Charge, Entry Time, and Exit Time.

### Flow:   
1. Fill book slot form  
2. View And Manage Page Display details perform search, filter and RELEASE Button 
3. If RELEASE Click Display Charge & Duration  
4. Able to see Slot data in Slot History Page
5. Able to see active slot data and total revenue on Dashboard Page  

### Bonus:   
No Bonus feature was implemented.  


### Step Followed:

1. Basic setup for installing library and code
2. Create Navbar with navigation tab
3. Type and Dummy Data
4. Home Page - UI
5. Book slot page - UI, logic
6. Initial setup of Local Storage & Context API  
7. Integrate Book slot page logic with Local Storage & Context API
8. View & Manage slot page - UI, logic
9. Slot History page - UI, logic  
10. Dashboard page, - UI, logic  
11. Search and Filter - UI, logic
12. Code Enhancement & Change UI
13. Test Project  

### Time Log:
1. Basic setup for installing library and code - 30m  
2. Create Navbar with navigation tab- 1h 15m  
3. Type and Dummy Data - 6h 10m   
5. Book slot page - UI, logic - 14h 10m  
6. Initial setup of Local Storage & Context API - 1h   
8. View & Manage slot page - UI, logic - 8h 50m  
9. Slot History page - UI, logic - 30m  
10. Dashboard & Home Page - UI , logic - 1h    
11. Search and Filter - UI, logic - 3h 45m  
12. Code Enhancement & Change UI - 1h 20m  
13. Test Project  - 20m

    Total Hour: 38h 50m
