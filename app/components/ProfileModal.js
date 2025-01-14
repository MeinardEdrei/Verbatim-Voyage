
const ProfileModal = ({ session, onClose, profileRef, signOut }) => {
  return (
    <div ref={profileRef} className="absolute right-[1vw] top-[8vh] bg-[var(--background)] p-10 border border-black/30 rounded-lg">
      <div className="">
        <h2>Profile</h2>
        <h2>Stories</h2>
        <h2>Stats</h2>

        <div>
          <button onClick={() => signOut()}>Sign out</button>
          <p>{session?.userSession?.user?.email}</p>
        </div>
      </div>
    </div>
  )
}

export default ProfileModal
