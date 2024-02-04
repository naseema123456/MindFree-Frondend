export interface User {
    name: string;
  }
  
export interface JitsiMeetOptions {
    roomName: string | undefined;
    width: number;
    height: number;
    configOverWrite: {
        proJoinPageEnable: boolean;
    };
    interfaceConfigOverWrite: {
        TILE_VIEW_MAX_COLUMNA: number;
    };
    parentNode: Element | null;
    userInfo: {
      displayName: string | undefined;
    };
  }
  export interface SendVideoData {
    link: string;
    id: string | undefined;
    userId: string | undefined;
  }
  

  
  
  