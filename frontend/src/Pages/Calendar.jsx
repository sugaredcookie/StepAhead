import React from 'react';
import './Calendar.css';
import { useNavigate } from 'react-router-dom';

function Calendar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
        // Check if user is authenticated (e.g., token exists)
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);
    
  const holidays = [
    { id: 1, date: '06-04-2025', name: 'Ram Navami' },
    { id: 2, date: '10-04-2025', name: 'Mahaveer Jayanti' },
    { id: 3, date: '14-04-2025', name: 'Ambedkar Jayanti' },
    { id: 4, date: '18-04-2025', name: 'Good Friday' },
    { id: 5, date: '01-05-2025', name: 'Maharashtra Day' },
    { id: 6, date: '05/05/25 to 11/06/25', name: 'Summer Vacation' },
    { id: 7, date: '06-07-2025', name: 'Muharram' },
    { id: 8, date: '09-08-2025', name: 'Rakshabandhan' },
    { id: 9, date: '15-08-2025', name: 'Independence Day' },
    { id: 10, date: '16-08-2025', name: 'Janmashtami' },
    { id: 11, date: '27-08-2025 to 01-09-2025', name: 'Ganesh Chaturthi' },
    { id: 12, date: '05-09-2025', name: 'Eid-E-Milad' },
    { id: 13, date: '06-09-2025', name: 'Anant Chaturdarshi' },
    { id: 14, date: '22-09-2025', name: 'Ghat Sthapna' },
    { id: 15, date: '30-09-2025 to 02/10/25', name: 'Navratri' },
    { id: 16, date: '18-10-2025 to 29/10/25', name: 'Diwali & Chhat Puja' },
    { id: 17, date: '05-11-2025', name: 'Guru Nanak Jayanti' },
    { id: 18, date: '25-12-2025 to 01/01/2026', name: 'Christmas & New Year Vacation' },
    { id: 19, date: '14-01-2026', name: 'Makar Sankranti' },
    { id: 20, date: '26-01-2026', name: 'Republic Day' },
    { id: 21, date: '15-02-2026', name: 'Maha Shivratri' },
    { id: 22, date: '19-02-2026', name: 'Shivaji Maharaj Jayanti' },
    { id: 23, date: '03-03-2026', name: 'Holi' },
    { id: 24, date: '19-03-2026', name: 'Gudi Padwa' },
    { id: 25, date: '20-03-2026', name: 'Eid-E-Fitr' },
    { id: 26, date: '27-03-2026', name: 'Ram Navami' },
    { id: 27, date: '31-03-2026', name: 'Mahavir Jayanti' }
  ];

  // Group holidays by month and year
  const holidaysByMonth = holidays.reduce((acc, holiday) => {
    let month, year;
    
    if (holiday.date.includes('to')) {
      const rangeParts = holiday.date.split(' to ');
      const startDate = rangeParts[0].includes('/') ? 
        rangeParts[0].split('/') : rangeParts[0].split('-');
      month = parseInt(startDate[1], 10);
      year = startDate[2].length === 2 ? `20${startDate[2]}` : startDate[2];
    } else {
      const dateParts = holiday.date.split('-');
      month = parseInt(dateParts[1], 10);
      year = dateParts[2];
    }
    
    const monthName = new Date(`${month}/01/${year}`).toLocaleString('default', { month: 'long' });
    const key = `${monthName} ${year}`;
    
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(holiday);
    return acc;
  }, {});

  function handleBackButton() {
        if (isAuthenticated) {
            navigate('/parentsDashboard');
        } else {
            navigate('/');
        }
    }

  return (
    <div className="calendar-container">
      <h1 className="calendar-title">Holiday Calendar 2025-26</h1>
      
      <div className="calendar-grid">
        {Object.entries(holidaysByMonth).map(([month, monthHolidays]) => (
          <div key={month} className="calendar-month">
            <h2 className="month-header">{month}</h2>
            <div className="holidays-list">
              {monthHolidays.map(holiday => (
                <div 
                  key={holiday.id} 
                  className="holiday-item"
                  data-is-vacation={holiday.name.toLowerCase().includes('vacation')}
                >
                  <div className="holiday-date">{holiday.date}</div>
                  <div className="holiday-name">{holiday.name}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button 
        className="back-button"
        onClick={handleBackButton}
      >
        Back to Home
      </button>
    </div>
  );
}

export default Calendar;