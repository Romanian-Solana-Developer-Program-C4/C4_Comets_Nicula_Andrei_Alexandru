use anchor_lang::prelude::*;

declare_id!("UU7m8MqbZgqR7KwkfvQUyBVoZazHzh1An5rhjorJ5kG");
pub const ANCHOR_DISCRIMINATOR_SIZE: usize = 8;
#[program]
pub mod favorites {
    use super::*;

    pub fn set_favorites(context: Context<SetFavorites>, number: i128, color: String, foods: Vec<String>) -> Result<()> {
        let user_pk = context.accounts.user.key();

        msg!("Program ID: {context.program_id}");
        msg!("User {user_PK}'s favorite number is {number}, favorite color is {color}\
              and favorite foods are: {:?}", foods);

        context.accounts.favorites.set_inner(Favorites {
            user: context.accounts.user.key(),
            number,
            color,
            foods
        });

        Ok(())
    }
}
#[derive(Accounts)]
pub struct SetFavorites<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        init_if_needed,
        payer = user,
        space = ANCHOR_DISCRIMINATOR_SIZE + Favorites::INIT_SPACE,
        seeds = [b"favorites", user.key().as_ref()],
        bump,
        has_one = user,
    )]
    pub favorites: Account<'info, Favorites>,

    pub system_program: Program<'info, System>,
}

#[account]
#[derive(InitSpace)]
pub struct Favorites {
    pub user: Pubkey,
    pub number: i128,
    #[max_len(25)]
    pub color: String,
    #[max_len(10, 50)]
    pub foods: Vec<String>
}