export const getStyles = (isMobile: boolean): Record<string, React.CSSProperties> => ({
    container: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      minHeight: '100vh',
      backgroundColor: '#f3f3f3',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
  
    menuButton: {
      border: 'none',
      fontSize: 40,
      textAlign: 'left',
      cursor: 'pointer',
      background: '#282828',
      color: '#fff',
      padding: '0 10px 10px 10px'
    },
  
    sidebar: {
      width: isMobile ? '100%' : 300,
      backgroundColor: '#282828',
      color: '#eee',
      padding: isMobile ? '16px 12px' : '24px 16px',
      display: 'flex',
      flexDirection: 'column',
    },
  
    sidebarHeader: {
      marginBottom: isMobile ? 16 : 20,
      paddingLeft: isMobile ? 0 : 8,
    },
  
    title: {
      margin: 0,
      fontSize: isMobile ? 16 : 18,
      fontWeight: 700,
      color: '#fff',
    },
  
    groupCreate: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: 8,
      marginBottom: 24,
    },
  
    sidebarInput: {
      flex: 1,
      backgroundColor: '#3d3d3d',
      border: '1px solid #444',
      borderRadius: 6,
      padding: '8px 12px',
      color: '#fff',
      fontSize: 14,
      width: '100%',
    },
  
    groupList: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
    },
  
    groupItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
      background: 'transparent',
      color: '#ccc',
      border: 'none',
      textAlign: 'left',
      padding: '10px 12px',
      borderRadius: 6,
      cursor: 'pointer',
      fontSize: 15,
    },
  
    groupSelectButton: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      background: 'transparent',
      border: 'none',
      color: 'inherit',
      textAlign: 'left',
      cursor: 'pointer',
      padding: 0,
      fontSize: 'inherit',
    },
  
    deleteButton: {
      width: 28,
      height: 28,
      border: 'none',
      borderRadius: 6,
      backgroundColor: '#4a4a4a',
      color: '#fff',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
  
    content: {
      flex: 1,
      padding: isMobile ? '20px 12px' : '40px 20px',
      overflowY: 'auto',
    },
  
    contentTitle: {
      fontSize: isMobile ? 20 : 24,
      fontWeight: 700,
      marginBottom: isMobile ? 16 : 24,
      color: '#202020',
    },
  
    taskCreate: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: 12,
      marginBottom: 32,
    },
  
    input: {
      flex: 1,
      width: '100%',
      padding: '12px 16px',
      borderRadius: 8,
      border: '1px solid #ddd',
      fontSize: 15,
      outline: 'none',
    },
  
    smallInput: {
      flex: 1,
      width: '100%',
      padding: '6px 10px',
      borderRadius: 6,
      border: '1px solid #eee',
      fontSize: 13,
      outline: 'none',
    },
  
    primaryButton: {
      padding: '10px 20px',
      backgroundColor: '#db4c3f',
      color: '#fff',
      border: 'none',
      borderRadius: 8,
      fontWeight: 600,
      cursor: 'pointer',
      width: isMobile ? '100%' : 'auto',
    },
  
    secondaryButton: {
      padding: '6px 12px',
      backgroundColor: '#555',
      color: '#fff',
      border: 'none',
      borderRadius: 6,
      cursor: 'pointer',
      width: isMobile ? '100%' : 'auto',
    },
  
    taskList: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    },
  
    taskCard: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: isMobile ? '16px' : '20px',
      border: '1px solid #f0f0f0',
      boxShadow: '0 2px 5px rgba(0,0,0,0.03)',
    },
  
    taskTitle: {
      fontSize: isMobile ? 15 : 17,
      fontWeight: 500,
      color: '#202020',
      marginBottom: 16,
      wordBreak: 'break-word',
    },
  
    subtaskList: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      marginBottom: 16,
      paddingLeft: 4,
    },
  
    subtaskItem: {
      fontSize: 14,
      color: '#666',
      display: 'flex',
      alignItems: 'flex-start',
      gap: 10,
      wordBreak: 'break-word',
    },
  
    subtaskDot: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      backgroundColor: '#db4c3f',
      marginTop: 6,
      flexShrink: 0,
    },
  
    subtaskCreate: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: 8,
      borderTop: '1px solid #f5f5f5',
      paddingTop: 12,
    },
  
    centeredNotice: {
      minHeight: isMobile ? 200 : '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#888',
      fontSize: isMobile ? 16 : 18,
      textAlign: 'center',
      padding: 16,
    },
  
    emptyState: {
      textAlign: 'center',
      color: '#aaa',
      padding: isMobile ? 20 : 40,
    },
  });