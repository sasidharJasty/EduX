; Program template

.386
.model flat,stdcall
.stack 4096
ExitProcess proto,dwExitCode:dword

.data

   msgforward WORD 6 DUP(?)
   msgbackward WORD 6 DUP(?)
   restore_esp DWORD ?

.code
main proc
  
  mov restore_esp, esp ; save the contents of register ESP so it can be restored before the program finishes
                       ; DO NOT REMOVE THIS

  ; clear the registers

  mov eax, 0
  mov ebx, 0
  mov ecx, 0
  mov edx, 0
  mov esi, 0
  mov edi, 0
  mov esp, 0
  mov ebp , 0

     ; store the message "Welcome Home" in reverse order across the six 16-bit registers

   mov ax, "EM"
   mov bx, "OH"
   mov si, " E"
   mov di, "MO"
   mov sp, "CL"
   mov bp, "EW"


 ; PUT YOUR INSTRUCTIONS FOR PHASES 1 -3 HERE
 ; PUT YOUR INSTRUCTIONS FOR PHASES 1 -3 HERE
 ; PUT YOUR INSTRUCTIONS FOR PHASES 1 -3 HERE
 ; PUT YOUR INSTRUCTIONS FOR PHASES 1 -3 HERE
 ; PUT YOUR INSTRUCTIONS FOR PHASES 1 -3 HERE


mov esp, restore_esp ; restore register ESP to it's original value so the program can end correctly
                     ; DO NOT REMOVE THIS

	invoke ExitProcess,0
main endp
end main