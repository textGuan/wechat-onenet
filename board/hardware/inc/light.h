#ifndef _LIGHT_H_
#define _LIGHT_H_





typedef struct
{

	float voltag;

} LIGHT_INFO;

extern LIGHT_INFO light_info;


void LIGHT_Init(void);

void LIGHT_GetVoltag(void);


#endif
