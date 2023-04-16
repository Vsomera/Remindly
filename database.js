let Database = {
    cindy: {
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
    alex: {
        reminders: []
    } 
}

module.exports = Database;