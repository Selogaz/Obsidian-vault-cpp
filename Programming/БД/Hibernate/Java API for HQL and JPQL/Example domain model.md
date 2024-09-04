Example 543. Examples domain model

```
@NamedQuery(
		name = "get_person_by_name",
		query = "select p from Person p where name = :name"
)
@NamedQuery(
		name = "get_read_only_person_by_name",
		query = "select p from Person p where name = :name",
		hints = {
				@QueryHint(
						name = "org.hibernate.readOnly",
						value = "true"
				)
		}
)
@NamedQuery(
		name = "delete_person",
		query = "delete Person"
)
@NamedStoredProcedureQuery(
		name = "sp_person_phones",
		procedureName = "sp_person_phones",
		parameters = {
				@StoredProcedureParameter(
						name = "personId",
						type = Long.class,
						mode = ParameterMode.IN
				),
				@StoredProcedureParameter(
						name = "personPhones",
						type = Class.class,
						mode = ParameterMode.REF_CURSOR
				)
		}
)
@Entity
public class Person {

	@Id
	@GeneratedValue
	private Long id;

	private String name;

	@Column(name = "nick_name")
	private String nickName;

	private String address;

	@Column(name = "created_on")
	private LocalDateTime createdOn;

	@OneToMany(mappedBy = "person", cascade = CascadeType.ALL)
	@OrderColumn(name = "order_id")
	private List<Phone> phones = new ArrayList<>();

	@ElementCollection
	@MapKeyEnumerated(EnumType.STRING)
	private Map<AddressType, String> addresses = new HashMap<>();

	@Version
	private int version;

	//Getters and setters are omitted for brevity

}

public enum AddressType {
	HOME,
	OFFICE
}

@Entity
public class Partner {

	@Id
	@GeneratedValue
	private Long id;

	private String name;

	@Version
	private int version;

	//Getters and setters are omitted for brevity

}

@Entity
public class Phone {

	@Id
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	private Person person;

	@Column(name = "phone_number")
	private String number;

	@Enumerated(EnumType.STRING)
	@Column(name = "phone_type")
	private PhoneType type;

	@OneToMany(mappedBy = "phone", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Call> calls = new ArrayList<>(  );

	@OneToMany(mappedBy = "phone")
	@MapKey(name = "timestamp")
	private Map<LocalDateTime, Call> callHistory = new HashMap<>();

	@ElementCollection
	private List<LocalDateTime> repairTimestamps = new ArrayList<>(  );

	//Getters and setters are omitted for brevity

}

public enum PhoneType {
	LAND_LINE,
	MOBILE;
}

@Entity
@Table(name = "phone_call")
public class Call {

	@Id
	@GeneratedValue
	private Long id;

	@ManyToOne
	private Phone phone;

	@Column(name = "call_timestamp")
	private LocalDateTime timestamp;

	private int duration;

	@ManyToOne
	private Payment payment;

	//Getters and setters are omitted for brevity

}

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Payment {

	@Id
	@GeneratedValue
	private Long id;

	private BigDecimal amount;

	private boolean completed;

	@ManyToOne
	private Account account;

	@ManyToOne
	private Person person;

	//Getters and setters are omitted for brevity

}

@Entity
public class CreditCardPayment extends Payment {
	@Column(name = "card_number")
	String cardNumber;

	public void setCardNumber(String cardNumber) {
		this.cardNumber = cardNumber;
	}

	public String getCardNumber() {
		return cardNumber;
	}
}

@Entity
public class WireTransferPayment extends Payment {
}
```

[[Java API for HQL and JPQL]]