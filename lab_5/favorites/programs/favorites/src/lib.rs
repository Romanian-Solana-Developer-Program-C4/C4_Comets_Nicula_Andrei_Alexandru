use anchor_lang::prelude::*;

declare_id!("UU7m8MqbZgqR7KwkfvQUyBVoZazHzh1An5rhjorJ5kG");

#[program]
pub mod favorites {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
