#![no_std]

use soroban_sdk::{contract, contractimpl, Address, Env, Symbol};

#[contract]
pub struct DocumentToken;

#[contractimpl]
impl DocumentToken {
    // pub fn initialize (env: Env, )
    pub fn tokenize(env: Env, doc_hash: Symbol, owner: Address) {
        // Use storage method
        env.storage().temporary().set(&doc_hash, &owner);
    }

    pub fn get_owner(env: Env, doc_hash: Symbol) -> Option<Address> {
        // Retrieve the owner from storage
        env.storage().temporary().get(&doc_hash)
    }
}
