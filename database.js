let Database = {
    cindy : {
        reminders: [
            {
                id: 1, 
                title: "Go Grocery Shopping", 
                description: "Feb 8th at 1:30pm", 
                completed: true
            }, 
            {
                id: 2, 
                title: "Dental Appointment", 
                description: "March 10th at 2:30pm", 
                completed: false
            },
            {
                id: 3, 
                title: "Final Exam", 
                description: "April 8th at 2:30pm", 
                completed: false
            }
        ]
    },
    alex : {
        reminders: [
            {
                id: 1, 
                title: "Driving Test", 
                description: "Feb 8th at 1:30pm", 
                completed: true
            }, 
            {
                id: 2, 
                title: "Doctors Appointment", 
                description: "March 20th at 5:30pm", 
                completed: false
            },
        ]
    },
    johnathan : {
        reminders: [
            {
                id: 1, 
                title: "Driving Test", 
                description: "Jan 11th at 4:00pm", 
                completed: true
            }, 
            {
                id: 2, 
                title: " Gym Time", 
                description: "May 20th at 12:30pm", 
                completed: false
            },
            {
                id: 3, 
                title: "Bowling with Friends", 
                description: "June 29th at 6:30pm", 
                completed: false
            }, 
            {
                id: 4, 
                title: "Job Interview", 
                description: "Sept 9th at 12:30pm", 
                completed: false
            },
        ]
    }
}

module.exports = Database;